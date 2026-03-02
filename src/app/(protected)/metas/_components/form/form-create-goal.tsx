import s from './_form.module.scss';
import { Modal } from '@/components/ui/modal';
import { ModalBackground } from '@/components/ui/modal-background';
import { Button } from '@/components/ui/button/button';
import * as Input from '@/components/ui/input/input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  goalFormSchema,
  IGoalFormSchema,
} from '@/validations/goal-form-schema';
import { toast } from 'sonner';
import { Dropdown } from '@/components/ui/dropdown/dropdown';
import { InputDate } from '@/components/ui/input/input-date/input-date';
import { categoryListSelect } from '@/utils/category-list';
import { useGoals } from '@/hooks/use-goals';
import { formatCurrencyInput, parseCurrency } from '@/utils/format-currency';
import { useEffect } from 'react';

interface IFormCreateGoalProps {
  onClose: () => void;
  onSave: () => void;
}

export const FormCreateGoal = ({ onClose, onSave }: IFormCreateGoalProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    clearErrors,
  } = useForm<IGoalFormSchema>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      name: '',
      category: '',
      contributionMonthly: '',
      valueAchieved: '',
      valueTotal: '',
      dateFinal: '',
    },
    mode: 'onChange',
  });

  const { addGoals } = useGoals();

  const valueTotalWatch = watch('valueTotal');
  const contributionMonthlyWatch = watch('contributionMonthly');

  useEffect(() => {
    clearErrors('valueTotal');
    clearErrors('contributionMonthly');
  }, [clearErrors]);

  const isValidSubmit = () => {
    let isValid = true;

    if (!valueTotalWatch || parseCurrency(valueTotalWatch) === 0) {
      setError('valueTotal', {
        message: 'O valor alvo deve ser maior que zero',
      });
      isValid = false;
    } else {
      clearErrors('valueTotal');
    }

    if (
      !contributionMonthlyWatch ||
      parseCurrency(contributionMonthlyWatch) === 0
    ) {
      setError('contributionMonthly', {
        message: 'A contribuição mensal deve ser maior que zero',
      });
      isValid = false;
    } else {
      clearErrors('contributionMonthly');
    }

    return isValid;
  };

  const handleInputValueNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    e.target.value = formatted;
  };

  const onSubmit: SubmitHandler<IGoalFormSchema> = async (data) => {
    if (!isValidSubmit()) return;

    try {
      const newGoal = {
        ...data,
        valueTotal: parseCurrency(data.valueTotal),
        valueAchieved: parseCurrency(data.valueAchieved),
        contributionMonthly: parseCurrency(data.contributionMonthly),
      };

      if (!isValidSubmit()) {
        toast.error('Campos obrigatórios não preenchidos.');
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await addGoals(newGoal);

      onSave();
    } catch (error) {
      toast.error('Erro ao criar meta.');
    }
  };

  return (
    <ModalBackground>
      <Modal.Root onClose={onClose} className={s.modal__root}>
        <Modal.Header title="Criar meta financeira" onClose={onClose} />

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Modal.Content className={s.modal__content}>
            <Input.Root>
              <Input.Label>Nome da meta</Input.Label>
              <Input.FormField
                type="text"
                placeholder="Digite o nome da meta"
                {...register('name')}
              />

              <Input.ErrorMessage message={errors?.name?.message} />
            </Input.Root>

            <Input.Root>
              <Input.Label>Valor alvo</Input.Label>
              <Input.FormField
                placeholder="R$ 0,00"
                {...register('valueTotal', {
                  onChange: handleInputValueNumber,
                })}
              />

              <Input.ErrorMessage message={errors.valueTotal?.message} />
              {valueTotalWatch === '0,00' && (
                <small className={s.input__error}>
                  O valor alvo precisa ser maior que zero.
                </small>
              )}
            </Input.Root>

            <Input.Root>
              <Input.Label>Valor já economizado</Input.Label>
              <Input.FormField
                placeholder="R$ 0,00"
                {...register('valueAchieved', {
                  onChange: handleInputValueNumber,
                })}
              />

              <Input.ErrorMessage message={errors.valueAchieved?.message} />
            </Input.Root>

            <Input.Root>
              <Input.Label>Contribuição mensal</Input.Label>
              <Input.FormField
                placeholder="R$ 0,00"
                {...register('contributionMonthly', {
                  onChange: handleInputValueNumber,
                })}
              />

              <Input.ErrorMessage
                message={errors.contributionMonthly?.message}
              />
            </Input.Root>

            <Controller
              control={control}
              name="dateFinal"
              render={({ field }) => (
                <InputDate
                  {...field}
                  label="Data final"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors?.dateFinal}
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Dropdown
                  label="Categoria"
                  {...field}
                  options={categoryListSelect}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione"
                />
              )}
            />
          </Modal.Content>
          <Modal.Footer className={s.modal__footer}>
            <Button variant="cancel" type="button" onClick={onClose}>
              Cancelar
            </Button>

            <Button variant="default" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Root>
    </ModalBackground>
  );
};
